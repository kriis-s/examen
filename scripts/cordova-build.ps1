param(
  [switch]$Release
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$env:ANDROID_HOME = "C:\Users\crish\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:Path = "$root\tools\gradle\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\cmdline-tools\latest\bin;$env:JAVA_HOME\bin;$env:Path"

Push-Location (Join-Path $root "cordova-app")
try {
  if ($Release) {
    npx cordova build android --release
  } else {
    npx cordova build android
  }
} finally {
  Pop-Location
}
