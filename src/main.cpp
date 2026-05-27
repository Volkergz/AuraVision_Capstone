#include <Arduino.h>

// ==========================================
// CONFIGURACIÓN Y PINES
// ==========================================
#define RX_PIN D0  
#define TX_PIN D1  
const int MUESTRAS = 5; // Cantidad de muestras para el filtro de precisión

// ==========================================
// FUNCIONES INTERNAS (AUXILIARES)
// ==========================================

// Función simple para ordenar los datos de menor a mayor
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

// Obtiene una sola lectura en cm del US-100
float lecturaIndividualDistancia() {
  while (Serial1.available()) Serial1.read(); // Limpiar ruidos
  
  Serial1.write(0x55); // Comando de distancia
  delay(40);           // Tiempo de procesamiento del sensor
  
  if (Serial1.available() >= 2) {
    byte alta = Serial1.read();
    byte baja = Serial1.read();
    int mm = (alta << 8) + baja;
    return mm / 10.0; // Convertir a cm
  }
  return -1.0; // Retorna -1 si hubo error de lectura
}


// ==========================================
// TU NUEVA FUNCIÓN PRINCIPAL DE DISTANCIA
// ==========================================
// Esta es la función que vas a llamar desde el loop o cualquier otra parte.
// Devuelve la distancia filtrada en cm, o -1.0 si falla.
float obtenerDistanciaPrecisa() {
  float lecturas[MUESTRAS];
  int lecturasValidas = 0;
  
  // Tomar la ráfaga de muestras para el filtro
  for (int i = 0; i < MUESTRAS; i++) {
    float dist = lecturaIndividualDistancia();
    if (dist > 1.5 && dist < 450.0) { // Filtrar rangos imposibles
      lecturas[lecturasValidas] = dist;
      lecturasValidas++;
    }
    delay(15); 
  }

  // Si logramos tomar lecturas estables, calculamos la mediana
  if (lecturasValidas > 0) {
    ordenarArray(lecturas, lecturasValidas);
    return lecturas[lecturasValidas / 2]; // Devuelve el valor central (filtrado)
  }
  
  return -1.0; // Si todo falló, devuelve error
}


// ==========================================
// ESTRUCTURA PRINCIPAL DE ARDUINO
// ==========================================

void setup() {
  Serial.begin(115200);
  Serial1.begin(9600, SERIAL_8N1, RX_PIN, TX_PIN);
  Serial.println("--- Sistema Modular Inicializado ---");
}

void loop() {
  // Llamamos a tu función de forma súper limpia
  float distanciaActual = obtenerDistanciaPrecisa();
  
  // Evaluamos el resultado de la función
  if (distanciaActual != -1.0) {
    Serial.print("Distancia: ");
    Serial.print(distanciaActual, 2);
    Serial.println(" cm");
  } else {
    Serial.println("Error al medir distancia.");
  }

  // Aquí abajo podrás meter las llamadas a tus futuras funciones, por ejemplo:
  // controlarMotorVibrador(distanciaActual);
  // reproducirAudio(distanciaActual);
  // leerGiroscopio();

  delay(300); // Pausa global del ciclo
}