/************************ Adafruit IO Config *******************************/

#define IO_USERNAME "nichola2266"
#define IO_KEY "api_key"

#define WIFI_SSID "Nic-is-da-best"
#define WIFI_PASS "Yisnicsocool"

// comment out the following lines if you are using fona or ethernet
#include "AdafruitIO_WiFi.h"

AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);