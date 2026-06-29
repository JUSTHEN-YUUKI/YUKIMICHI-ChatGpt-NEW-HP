import { Suspense } from 'react'
import Script from 'next/script'
import AnalyticsEvents from '@/components/AnalyticsEvents'

function getEnvValue(name: string) {
  return process.env[name]?.trim() || ''
}

export default function Analytics() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const gaMeasurementId = getEnvValue('GA_MEASUREMENT_ID')
  const clarityProjectId = getEnvValue('CLARITY_PROJECT_ID')

  if (!isProduction || (!gaMeasurementId && !clarityProjectId)) {
    return null
  }

  const gaMeasurementIdJson = JSON.stringify(gaMeasurementId)
  const clarityProjectIdJson = JSON.stringify(clarityProjectId)

  return (
    <>
      {gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${gaMeasurementIdJson}, { send_page_view: false });
              `,
            }}
          />
          <Suspense fallback={null}>
            <AnalyticsEvents measurementId={gaMeasurementId} />
          </Suspense>
        </>
      )}

      {clarityProjectId && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", ${clarityProjectIdJson});
            `,
          }}
        />
      )}
    </>
  )
}
