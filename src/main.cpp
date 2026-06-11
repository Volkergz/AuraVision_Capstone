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

// ==========================================
// CONFIGURACIÓN GENERAL
// ==========================================
const int MUESTRAS = 1;
HardwareSerial SerialSensor2(2);

// PWM por hardware (LEDC)
const int PWM_FREQ = 5000;
const int PWM_RES = 8;
const int PWM_CH_IZQ = 0;
const int PWM_CH_DER = 1;

// Variables de suavizado
float pwmSuaveIzq = 0.0;
float pwmSuaveDer = 0.0;
const float FACTOR_SUAVIZADO = 0.75;

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

  while (puertoSerial.available()) {
    puertoSerial.read();
  }

  puertoSerial.write(0x55);
  puertoSerial.flush();

  delay(12);

  for (int i = 0; i < MUESTRAS; i++) {
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
  }

  if (lecturasValidas > 0) {
    ordenarArray(lecturas, lecturasValidas);
    return lecturas[lecturasValidas / 2];
  }

  return -1.0;
}

// ==========================================
// INTENSIDAD SEGÚN DISTANCIA
// ==========================================
int calcularIntensidadRecomendada(float distancia) {

  // Sin lectura válida
  if (distancia == -1.0) {
    return 0;
  }

  // Ignorar objetos demasiado cerca o lejos
  if (distancia < 20.0 || distancia > 180.0) {
    return 0;
  }

  if (distancia < 80.0) {
    return 225;
  }

  if (distancia < 140.0) {
    return 175;
  }

  return 130;
}

// ==========================================
// SETUP
// ==========================================
void setup() {

  Serial.begin(115200);
  delay(300);

  Serial1.begin(9600, SERIAL_8N1, S1_RX_PIN, S1_TX_PIN);
  SerialSensor2.begin(9600, SERIAL_8N1, S2_RX_PIN, S2_TX_PIN);

  pinMode(MOTOR_IZQ_PIN, OUTPUT);
  pinMode(MOTOR_DER_PIN, OUTPUT);

  ledcSetup(PWM_CH_IZQ, PWM_FREQ, PWM_RES);
  ledcSetup(PWM_CH_DER, PWM_FREQ, PWM_RES);

  ledcAttachPin(MOTOR_IZQ_PIN, PWM_CH_IZQ);
  ledcAttachPin(MOTOR_DER_PIN, PWM_CH_DER);

  ledcWrite(PWM_CH_IZQ, 0);
  ledcWrite(PWM_CH_DER, 0);

  Serial.println("=== SISTEMA INICIADO ===");
}

// ==========================================
// LOOP
// ==========================================
void loop() {

  float distIzq = medirDistanciaSensor(Serial1);
  float distDer = medirDistanciaSensor(SerialSensor2);

  int pwmObjetivoIzq = calcularIntensidadRecomendada(distIzq);
  int pwmObjetivoDer = calcularIntensidadRecomendada(distDer);

  // Si no hay obstáculo, apagar inmediatamente
  if (pwmObjetivoIzq == 0) {
    pwmSuaveIzq = 0;
  } else {
    pwmSuaveIzq += FACTOR_SUAVIZADO * (pwmObjetivoIzq - pwmSuaveIzq);
  }

  if (pwmObjetivoDer == 0) {
    pwmSuaveDer = 0;
  } else {
    pwmSuaveDer += FACTOR_SUAVIZADO * (pwmObjetivoDer - pwmSuaveDer);
  }

  ledcWrite(PWM_CH_IZQ, (int)pwmSuaveIzq);
  ledcWrite(PWM_CH_DER, (int)pwmSuaveDer);

  // DEPURACIÓN
  Serial.print("IZQ: ");
  Serial.print(distIzq);
  Serial.print(" cm | PWM: ");
  Serial.print((int)pwmSuaveIzq);

  Serial.print(" || DER: ");
  Serial.print(distDer);
  Serial.print(" cm | PWM: ");
  Serial.println((int)pwmSuaveDer);

  delay(10);
}