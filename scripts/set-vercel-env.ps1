# Helper: add env var to production + preview (all branches) + development
function Set-VercelEnv {
    param(
        [string]$Name,
        [string]$Value
    )
    Write-Host "Setting $Name ..."

    # Production
    $Value | vercel env add $Name production --force 2>&1 | Out-Null

    # Preview – pipe empty string for "all preview branches"
    $result = $Value | vercel env add $Name preview --force 2>&1
    # If it asked for branch, send empty line
    if ($result -match "which Git branch") {
        "" | vercel env add $Name preview "" --force 2>&1 | Out-Null
    }

    # Development
    $Value | vercel env add $Name development --force 2>&1 | Out-Null

    Write-Host "  Done: $Name"
}

# ── Database ──────────────────────────────────────────────────────────────────
$dbUrl = "postgresql://neondb_owner:npg_5TuS2QHjELIr@ep-raspy-rain-aqy7w2pd-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
Set-VercelEnv "DATABASE_URL"  $dbUrl
Set-VercelEnv "DIRECT_URL"    $dbUrl

# ── App ───────────────────────────────────────────────────────────────────────
Set-VercelEnv "APP_URL" "https://radhanafashion.vercel.app"

# ── Auth ─────────────────────────────────────────────────────────────────────
Set-VercelEnv "JWT_SECRET"    "your-secret-key-change-in-production"
Set-VercelEnv "JWT_EXPIRES_IN" "7d"

# ── Cloudinary ────────────────────────────────────────────────────────────────
Set-VercelEnv "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME" "dftzkjgql"
Set-VercelEnv "CLOUDINARY_API_KEY"    "159494984118399"
Set-VercelEnv "CLOUDINARY_API_SECRET" "2Vik-24wng028hta4BQPcKg22lM"

# ── Razorpay (placeholders – update with real keys) ──────────────────────────
Set-VercelEnv "RAZORPAY_KEY_ID"              "rzp_test_xxxxxxxx"
Set-VercelEnv "RAZORPAY_KEY_SECRET"          "your_razorpay_secret"
Set-VercelEnv "NEXT_PUBLIC_RAZORPAY_KEY_ID"  "rzp_test_xxxxxxxx"

# ── Email (placeholders – update with real SMTP creds) ───────────────────────
Set-VercelEnv "EMAIL_HOST" "smtp.gmail.com"
Set-VercelEnv "EMAIL_PORT" "587"
Set-VercelEnv "EMAIL_USER" "your-email@gmail.com"
Set-VercelEnv "EMAIL_PASS" "your-app-password"
Set-VercelEnv "EMAIL_FROM" "RADHANA Klothing <noreply@yourdomain.com>"

Write-Host "`nAll environment variables set. Run 'vercel env ls' to verify."
