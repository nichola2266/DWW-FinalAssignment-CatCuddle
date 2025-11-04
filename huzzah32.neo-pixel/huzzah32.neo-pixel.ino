#include <ESPmDNS.h>

// creating the links
#include <Adafruit_NeoPixel.h>
#include "config.h"

// set up the 'color' feed
AdafruitIO_Feed *color = io.feed("data-color");

//defining relevant features
#define PIN 21
Adafruit_NeoPixel matrix = Adafruit_NeoPixel(64, PIN, NEO_RGBW + NEO_KHZ800);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  // wait for serial monitor to open
  while (!Serial);

  // connect to io.adafruit.com
  Serial.print("Connecting to Adafruit IO");
  io.connect();
  // set up a message handler for the 'digital' feed.
  // the handleMessage function (defined below)
  // will be called whenever a message is
  // received from adafruit io.
  color->onMessage(handleDataColor);
  // wait for a connection
  while (io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  matrix.begin();
  matrix.setBrightness(10);
  matrix.show();

  // now we are connected
  Serial.println();
  Serial.println(io.statusText());
  delay(500);
  color->get();
}

void loop() {
  // put your main code here, to run repeatedly:
  io.run();
}

// allow datacolor array connect with matrix
void handleDataColor(AdafruitIO_Data *data) {
  Serial.println("Fetching data color from AdafruitIO");

  long colorLong = data->toLong();
  Serial.println(colorLong);

  // wipe clean
  matrix.clear();
  for (int i = 0; i <= 64; i++) {
    matrix.setPixelColor(i, colorLong);
  }
  //make it visible in matrix
  matrix.show();
}
