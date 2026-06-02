#include <Arduino.h>

// ==========================================
// CONFIGURACIÓN DE PINES (TODOS EN EL MISMO LADO)
// ==========================================
// Sensor 1
#define S1_RX_PIN D0  
#define S1_TX_PIN D1  

// Sensor 2
#define S2_RX_PIN D2
#define S2_TX_PIN D3

// Optimización para movimiento: 3 muestras son ideales
const int MUESTRAS = 3; 

// Creamos el puerto serial de hardware número 2 exclusivo para el Sensor 2
HardwareSerial SerialSensor2(2); 

// ==========================================
// FUNCIONES AUXILIARES (FILTRADO MEDIANO)
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
    // Limpiar basura acumulada en el buffer antes de pedir datos
    while (puertoSerial.available()) puertoSerial.read(); 
    
    puertoSerial.write(0x55); // Enviar el comando de disparo por UART al US-100
    delay(40);                // Tiempo físico para que el sensor calcule el eco
    
    if (puertoSerial.available() >= 2) {
      byte alta = puertoSerial.read();
      byte baja = puertoSerial.read();
      int mm = (alta << 8) + baja;
      float cm = mm / 10.0;
      
      // Rango de interés (filtramos rebotes falsos de 0cm o distancias extremas)
      if (cm > 2.0 && cm < 250.0) { 
        lecturas[lecturasValidas] = cm;
        lecturasValidas++;
      }
    }
    delay(15); 
  }

  if (lecturasValidas > 0) {
    ordenarArray(lecturas, lecturasValidas);
    return lecturas[lecturasValidas / 2]; // Retornamos el valor central (mediana)
  }
  
  return -1.0; // Si no hay respuesta o está fuera de rango
}

// ==========================================
// CONFIGURACIÓN PRINCIPAL
// ==========================================
void setup() {
  // Inicializar USB nativo para ver datos en el monitor serial de la PC
  Serial.begin(115200); 
  delay(1000); 
  
  // Inicializar Sensor 1 en el puerto de hardware Serial1 (pines D0 y D1)
  Serial1.begin(9600, SERIAL_8N1, S1_RX_PIN, S1_TX_PIN);
  
  // Inicializar Sensor 2 en el puerto de hardware Serial2 (pines D2 y D3)
  SerialSensor2.begin(9600, SERIAL_8N1, S2_RX_PIN, S2_TX_PIN);
  
  Serial.println("\n=== SISTEMA DOBLE CONFIGURADO (D0, D1, D2, D3) ===");
}

// ==========================================
// BUCLE PRINCIPAL
// ==========================================
void loop() {
  // 1. Medir Sensor 1
  float distSensor1 = medirDistanciaSensor(Serial1);
  
  delay(30); // Pausa necesaria para evitar que el sonido del Sensor 1 rebote en el Sensor 2
  
  // 2. Medir Sensor 2
  float distSensor2 = medirDistanciaSensor(SerialSensor2);

  // --- Imprimir Resultados en Pantalla ---
  Serial.print("Sensor 1: ");
  if (distSensor1 != -1.0) {
    Serial.print(distSensor1, 1);
    Serial.print(" cm | ");
  } else {
    Serial.print("Fuera de rango | ");
  }

  Serial.print("Sensor 2: ");
  if (distSensor2 != -1.0) {
    Serial.print(distSensor2, 1);
    Serial.println(" cm");
  } else {
    Serial.println("Fuera de rango");
  }

  delay(100); // Frecuencia de actualización general
}