#include <Arduino.h>

// ==========================================
// CONFIGURACIÓN DE PINES (XIAO ESP32-S3)
// ==========================================
#define S1_RX_PIN D0  
#define S1_TX_PIN D1  
#define S2_RX_PIN D2
#define S2_TX_PIN D3

#define MOTOR_IZQ_PIN D4  
#define MOTOR_DER_PIN D5  

const int MUESTRAS = 3; 
HardwareSerial SerialSensor2(2); 

// Variables para suavizar los cambios de PWM (Filtro paso bajo para los motores)
float pwmSuaveIzq = 0.0;
float pwmSuaveDer = 0.0;
const float FACTOR_SUAVIZADO = 0.2; // Entre más bajo, más suave la transición entre rangos

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================
void ordenarArray(float arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        float temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

float medirDistanciaSensor(HardwareSerial &puertoSerial) {
  float lecturas[MUESTRAS];
  int lecturasValidas = 0;

  for (int i = 0; i < MUESTRAS; i++) {
    while (puertoSerial.available()) puertoSerial.read(); 
    puertoSerial.write(0x55); 
    delay(40);                
    
    if (puertoSerial.available() >= 2) {
      byte alta = puertoSerial.read();
      byte baja = puertoSerial.read();
      int mm = (alta << 8) + baja;
      float cm = mm / 10.0;
      
      if (cm > 2.0 && cm < 300.0) { 
        lecturas[lecturasValidas] = cm;
        lecturasValidas++;
      }
    }
    delay(15); 
  }

  if (lecturasValidas > 0) {
    ordenarArray(lecturas, lecturasValidas);
    return lecturas[lecturasValidas / 2]; 
  }
  return -1.0; 
}

// ==========================================
// FUNCIÓN DE INTENSIDAD RECOMENDADA
// ==========================================
int calcularIntensidadRecomendada(float distancia) {
  // 1. Fuera de rango o más de 2 metros -> Silencio absoluto
  if (distancia == -1.0 || distancia > 200.0) {
    return 0; 
  }
  
  // 2. Zona de contacto/seguridad (< 20 cm) -> Apagado para evitar estrés
  if (distancia < 20.0) {
    return 0; 
  }
  
  // 3. RANGOS OPTIMIZADOS SIN HUECOS:
  // RANGO ALERTA CRÍTICA: De 20 cm a 80 cm
  if (distancia >= 20.0 && distancia < 80.0) {
    return 225; 
  }
  
  // RANGO PREVENTIVO MEDIO: De 80 cm a 140 cm
  if (distancia >= 80.0 && distancia < 140.0) {
    return 175; 
  }
  
  // RANGO DE DETECCIÓN LEJANA: De 140 cm a 200 cm
  if (distancia >= 140.0 && distancia <= 200.0) {
    return 130; 
  }

  return 0; 
}

// ==========================================
// CONFIGURACIÓN PRINCIPAL
// ==========================================
void setup() {
  Serial.begin(115200); 
  delay(1000); 
  
  pinMode(MOTOR_IZQ_PIN, OUTPUT);
  pinMode(MOTOR_DER_PIN, OUTPUT);
  
  analogWrite(MOTOR_IZQ_PIN, 0);
  analogWrite(MOTOR_DER_PIN, 0);

  Serial1.begin(9600, SERIAL_8N1, S1_RX_PIN, S1_TX_PIN);      
  SerialSensor2.begin(9600, SERIAL_8N1, S2_RX_PIN, S2_TX_PIN); 
  
  Serial.println("\n=== PROTOCOLO RECOMENDADO POR RANGOS SUAVES INICIADO ===");
}

// ==========================================
// BUCLE PRINCIPAL
// ==========================================
void loop() {
  float distIzq = medirDistanciaSensor(Serial1);
  delay(30); 
  float distDer = medirDistanciaSensor(SerialSensor2);

  // Calcular el PWM teórico objetivo para cada lado
  int pwmObjetivoIzq = calcularIntensidadRecomendada(distIzq);
  int pwmObjetivoDer = calcularIntensidadRecomendada(distDer);

  // APLICACIÓN DEL FILTRO DE TRANSICIÓN SUAVE:
  // En lugar de saltar instantáneamente (ej: de 175 a 225), el motor incrementa 
  // su fuerza de forma fluida en cuestión de milisegundos. Es mucho más cómodo para la cabeza.
  pwmSuaveIzq = pwmSuaveIzq + FACTOR_SUAVIZADO * (pwmObjetivoIzq - pwmSuaveIzq);
  pwmSuaveDer = pwmSuaveDer + FACTOR_SUAVIZADO * (pwmObjetivoDer - pwmSuaveDer);

  // Escribimos el valor suavizado final convertido a entero
  analogWrite(MOTOR_IZQ_PIN, (int)pwmSuaveIzq);
  analogWrite(MOTOR_DER_PIN, (int)pwmSuaveDer);

  // Telemetría para análisis
  Serial.print("IZQ: ");
  if (distIzq != -1.0) {
    Serial.print(distIzq, 1);
    Serial.print(" cm (PWM Real: ");
    Serial.print((int)pwmSuaveIzq);
    Serial.print(") | ");
  } else {
    Serial.print("Despejado | ");
  }

  Serial.print("DER: ");
  if (distDer != -1.0) {
    Serial.print(distDer, 1);
    Serial.print(" cm (PWM Real: ");
    Serial.print((int)pwmSuaveDer);
    Serial.println(")");
  } else {
    Serial.println("Despejado");
  }

  delay(60); 
}