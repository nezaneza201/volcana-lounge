<#
  VOLCANA LOUNGE — bitmap asset export
  ====================================
  The site ships its imagery as SVG (tiny, instant, always sharp), but two files
  must exist as real bitmaps:

      assets/img/og-volcana-lounge.png   1200 x 630   link preview card (Open Graph)
      assets/img/apple-touch-icon.png    180 x 180    icon when the site is added
                                                      to an iPhone home screen

  Both are drawn here with Windows' own graphics engine (System.Drawing), so the
  script needs nothing installed: no browser, no design software, no downloads.

  HOW TO RUN
      powershell -ExecutionPolicy Bypass -File tools/export-images.ps1

  The artwork mirrors assets/img/og-source.svg. If you edit that SVG in a design
  tool, you can export it at 1200 x 630 and save it over
  assets/img/og-volcana-lounge.png instead.
#>

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root   = Split-Path -Parent $PSScriptRoot
$imgDir = Join-Path $root 'assets\img'

# ---------------------------------------------------------------- brand colours
$C = @{
  ink    = '#0B0A09'
  warm   = '#2A1B12'
  ember  = '#E28B3B'
  gold   = '#C8A15A'
  cream  = '#F4EDE1'
  body   = '#D8CDBD'
  muted  = '#9A8F83'
  ridge1 = '#100D0B'
  ridge2 = '#0A0807'
}

function Col([string]$hex, [int]$alpha = 255) {
  $c = [System.Drawing.ColorTranslator]::FromHtml($hex)
  return [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B)
}

function New-Canvas([int]$w, [int]$h) {
  $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  return @{ Bitmap = $bmp; Graphics = $g }
}

function Get-Font([string]$family, [single]$size, $style) {
  try   { return New-Object System.Drawing.Font($family, $size, $style, [System.Drawing.GraphicsUnit]::Pixel) }
  catch { return New-Object System.Drawing.Font('Segoe UI', $size, $style, [System.Drawing.GraphicsUnit]::Pixel) }
}

function Save-Png {
  param($canvas, [string]$path)
  $canvas.Bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas.Graphics.Dispose()
  $canvas.Bitmap.Dispose()
}

# Even letter spacing, drawn one character at a time (GDI+ has no tracking).
function Text-Tracked {
  param(
    [System.Drawing.Graphics]$g, [string]$text, [System.Drawing.Font]$font,
    [System.Drawing.Brush]$brush, [single]$x, [single]$y, [single]$tracking
  )
  $cursor = $x
  foreach ($ch in $text.ToCharArray()) {
    $part = [string]$ch
    $g.DrawString($part, $font, $brush, $cursor, $y)
    $cursor += $g.MeasureString($part, $font).Width + $tracking
  }
}

# Ridge silhouette built from x,y pairs given on a 1200 x 630 grid.
function Draw-Ridge {
  param(
    [System.Drawing.Graphics]$g, [int]$w, [int]$h,
    [int[]]$points, [string]$colour, [int]$alpha
  )
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $pts  = New-Object 'System.Collections.Generic.List[System.Drawing.PointF]'
  for ($i = 0; $i -lt $points.Count; $i += 2) {
    $px = [single]($points[$i] * $w / 1200)
    $py = [single]($points[$i + 1] * $h / 630)
    $pts.Add((New-Object System.Drawing.PointF($px, $py)))
  }
  $pts.Add((New-Object System.Drawing.PointF([single]$w, [single]$h)))
  $pts.Add((New-Object System.Drawing.PointF([single]0, [single]$h)))
  $path.AddPolygon($pts.ToArray())
  $brush = New-Object System.Drawing.SolidBrush (Col $colour $alpha)
  $g.FillPath($brush, $path)
  $brush.Dispose(); $path.Dispose()
}

# The Volcana mark: an open volcano outline, a filled crater and a base dot.
function Draw-Mark {
  param([System.Drawing.Graphics]$g, [single]$ox, [single]$oy, [single]$scale, [single]$stroke)
  $gradRect = New-Object System.Drawing.Rectangle([int]$ox, [int]$oy, [int](300 * $scale), [int](104 * $scale))
  $grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($gradRect, (Col $C.ember), (Col $C.gold), 0.0)
  $pen  = New-Object System.Drawing.Pen($grad, $stroke)
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap   = [System.Drawing.Drawing2D.LineCap]::Round

  $g.DrawLines($pen, @(
    (New-Object System.Drawing.PointF([single]($ox +   0 * $scale), [single]($oy +  94 * $scale))),
    (New-Object System.Drawing.PointF([single]($ox +  70 * $scale), [single]($oy +   2 * $scale))),
    (New-Object System.Drawing.PointF([single]($ox + 110 * $scale), [single]($oy +  60 * $scale))),
    (New-Object System.Drawing.PointF([single]($ox + 138 * $scale), [single]($oy +  26 * $scale))),
    (New-Object System.Drawing.PointF([single]($ox + 224 * $scale), [single]($oy +  94 * $scale)))
  ))

  $crater = New-Object System.Drawing.Drawing2D.GraphicsPath
  $crater.AddPolygon(@(
    (New-Object System.Drawing.PointF([single]($ox +  70 * $scale), [single]($oy +  2 * $scale))),
    (New-Object System.Drawing.PointF([single]($ox +  90 * $scale), [single]($oy + 36 * $scale))),
    (New-Object System.Drawing.PointF([single]($ox +  70 * $scale), [single]($oy + 52 * $scale))),
    (New-Object System.Drawing.PointF([single]($ox +  54 * $scale), [single]($oy + 30 * $scale)))
  ))
  $g.FillPath((New-Object System.Drawing.SolidBrush (Col $C.ember)), $crater)

  $pen.Dispose(); $grad.Dispose(); $crater.Dispose()
}

Write-Host 'Exporting Volcana Lounge bitmap assets...'
Write-Host ''

# ============================================================================
#  1. LINK PREVIEW CARD — 1200 x 630 (the image shown when the link is shared)
# ============================================================================
$W = 1200; $H = 630
$card = New-Canvas $W $H
$g = $card.Graphics
$canvasRect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)

# base gradient
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush($canvasRect, (Col $C.ink), (Col $C.warm), 45.0)
$g.FillRectangle($bg, $canvasRect)
$bg.Dispose()

# warm ember glow, lower right
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath.AddEllipse(680, 240, 1100, 1100)
$glow = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
$glow.CenterColor    = (Col $C.ember 84)
$glow.SurroundColors = @((Col $C.ember 0))
$g.FillPath($glow, $glowPath)
$glow.Dispose(); $glowPath.Dispose()

# volcanic ridges
Draw-Ridge -g $g -w $W -h $H -colour $C.ridge1 -alpha 216 `
  -points @(0,470, 140,430, 260,466, 400,360, 520,452, 640,300, 780,448, 900,372, 1030,452, 1150,402, 1200,430)
Draw-Ridge -g $g -w $W -h $H -colour $C.ridge2 -alpha 255 `
  -points @(0,540, 180,500, 360,546, 540,470, 720,540, 900,484, 1080,546, 1200,512)

# brand mark
Draw-Mark -g $g -ox 74 -oy 104 -scale 1.0 -stroke 5

# type
$fTitle = Get-Font 'Georgia' 74 ([System.Drawing.FontStyle]::Regular)
$fTag   = Get-Font 'Georgia' 30 ([System.Drawing.FontStyle]::Italic)
$fBody  = Get-Font 'Segoe UI' 21 ([System.Drawing.FontStyle]::Regular)
$fMeta  = Get-Font 'Segoe UI' 19 ([System.Drawing.FontStyle]::Regular)
$bCream = New-Object System.Drawing.SolidBrush (Col $C.cream)
$bGold  = New-Object System.Drawing.SolidBrush (Col $C.gold)
$bBody  = New-Object System.Drawing.SolidBrush (Col $C.body)
$bMuted = New-Object System.Drawing.SolidBrush (Col $C.muted)

$g.DrawString('Volcana Lounge', $fTitle, $bCream, 74, 188)
$g.DrawString('Taste the Spirit of Musanze', $fTag, $bGold, 77, 292)

$ruleRect  = New-Object System.Drawing.Rectangle(74, 362, 124, 2)
$ruleBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($ruleRect, (Col $C.ember), (Col $C.gold), 0.0)
$g.FillRectangle($ruleBrush, 74, 362, 124, 2)
$ruleBrush.Dispose()

Text-Tracked -g $g -text 'Wood-fired pizza - Local & international dishes' `
  -font $fBody -brush $bBody -x 74 -y 392 -tracking 1.2
Text-Tracked -g $g -text 'Musanze, Rwanda - Open daily 11:30 AM - 11:00 PM - +250 785 818 501' `
  -font $fMeta -brush $bMuted -x 74 -y 434 -tracking 1.2

$cardPath = Join-Path $imgDir 'og-volcana-lounge.png'
Save-Png $card $cardPath
Write-Host ("  OK  og-volcana-lounge.png  1200 x 630   {0} KB" -f [math]::Round((Get-Item $cardPath).Length / 1KB, 1))

# ============================================================================
#  2. APPLE TOUCH ICON — 180 x 180 (added to an iPhone home screen)
# ============================================================================
$S = 180
$icon = New-Canvas $S $S
$gi = $icon.Graphics
$gi.FillRectangle((New-Object System.Drawing.SolidBrush (Col $C.ink)), 0, 0, $S, $S)
Draw-Mark -g $gi -ox 20 -oy 50 -scale 0.62 -stroke 6
$gi.FillEllipse((New-Object System.Drawing.SolidBrush (Col $C.gold)), 84, 128, 12, 12)

$iconPath = Join-Path $imgDir 'apple-touch-icon.png'
Save-Png $icon $iconPath
Write-Host ("  OK  apple-touch-icon.png   180 x 180    {0} KB" -f [math]::Round((Get-Item $iconPath).Length / 1KB, 1))

$fTitle.Dispose(); $fTag.Dispose(); $fBody.Dispose(); $fMeta.Dispose()
$bCream.Dispose(); $bGold.Dispose(); $bBody.Dispose(); $bMuted.Dispose()

Write-Host ''
Write-Host 'Done. Both files are in assets/img/ - refresh the site to see them resolve.'
Write-Host 'Re-run this script any time the brand colours or the volcano mark change.'