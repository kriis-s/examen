$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$keystore = Join-Path $root "keystore\dibujitos-release.keystore"

if (-not (Test-Path -LiteralPath $keystore)) {
  throw "No se encontro la keystore en $keystore"
}

$storePassword = Read-Host "Password de la keystore" -AsSecureString
$keyPassword = Read-Host "Password de la llave (Enter si es la misma)" -AsSecureString

$storePlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
  [Runtime.InteropServices.Marshal]::SecureStringToBSTR($storePassword)
)
$keyPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
  [Runtime.InteropServices.Marshal]::SecureStringToBSTR($keyPassword)
)

if ([string]::IsNullOrWhiteSpace($keyPlain)) {
  $keyPlain = $storePlain
}

$env:ANDROID_HOME = "C:\Users\crish\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:Path = "$root\tools\gradle\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\cmdline-tools\latest\bin;$env:JAVA_HOME\bin;$env:Path"

npm run mobile:sync

Push-Location (Join-Path $root "cordova-app")
try {
  npx cordova build android --release -- `
    --packageType=apk `
    --keystore="$keystore" `
    --storePassword="$storePlain" `
    --alias="dibujitos" `
    --password="$keyPlain"
} finally {
  Pop-Location
}
