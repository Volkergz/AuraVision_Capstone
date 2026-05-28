#include <Arduino.h>

// ==========================================
// CONFIGURACIÓN DE PINES (ESP32-S3 NATIVO)
// ==========================================
// Sensor 1
#define S1_RX_PIN D0  
#define S1_TX_PIN D1  

// Sensor 2 (Pines limpios en la protoboard)
#define S2_RX_PIN D6  
#define S2_TX_PIN D7  

// Optimización para movimiento
const int MUESTRAS = 3; 

// ==========================================
// FUNCIONES AUXILIARES (FILTRADO)
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

// ==========================================
// FUNCIÓN CENTRAL DE LECTURA (UNIVERSAL)
// ==========================================
float medirDistanciaSensor(HardwareSerial &puertoSerial) {
  float lecturas[MUESTRAS];
  int lecturasValidas = 0;

  for (int i = 0; i < MUESTRAS; i++) {
    // Limpiar basura del búfer antes de pedir datos
    while (puertoSerial.available()) puertoSerial.read(); 
    
    puertoSerial.write(0x55); // Solicitar distancia por UART
    delay(40);                // Tiempo físico que requiere el US-100 para calcular
    
    if (puertoSerial.available() >= 2) {
      byte alta = puertoSerial.read();
      byte baja = puertoSerial.read();
      int mm = (alta << 8) + baja;
      float cm = mm / 10.0;
      
      // Filtramos el rango de interés en movimiento (de 2 cm a 250 cm)
      if (cm > 2.0 && cm < 250.0) { 
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
// CONFIGURACIÓN PRINCIPAL
// ==========================================
void setup() {
  // OJO: En el XIAO ESP32-S3, 'Serial' es el USB nativo hacia la PC.
  Serial.begin(115200); 
  delay(1000); 
  
  // Inicializar Sensor 1 usando el puerto de hardware Serial1
  Serial1.begin(9600, SERIAL_8N1, S1_RX_PIN, S1_TX_PIN);
  
  // Inicializar Sensor 2 usando el puerto de hardware Serial0 (remapeado a D6 y D7)
  Serial0.begin(9600, SERIAL_8N1, S2_RX_PIN, S2_TX_PIN);
  
  Serial.println("--- Sistema Doble UART Inicializado con Éxito ---");
}

// ==========================================
// BUCLE PRINCIPAL
// ==========================================
void loop() {
  // Medimos secuencialmente ambos sensores
  float distSensor1 = medirDistanciaSensor(Serial1);
  
  delay(20); // Micro pausa para evitar interferencia acústica en el aire
  
  float distSensor2 = medirDistanciaSensor(Serial0);

  // --- Imprimir Resultados Sensor 1 ---
  Serial.print("Sensor 1: ");
  if (distSensor1 != -1.0) {
    Serial.print(distSensor1, 1);
    Serial.print(" cm | ");
  } else {
    Serial.print("Fuera de rango | ");
  }

  // --- Imprimir Resultados Sensor 2 ---
  Serial.print("Sensor 2: ");
  if (distSensor2 != -1.0) {
    Serial.print(distSensor2, 1);
    Serial.println(" cm");
  } else {
    Serial.println("Fuera de rango");
  }

  delay(100); 
}