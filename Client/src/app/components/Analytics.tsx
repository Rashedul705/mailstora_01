import Script from "next/script";

type Ids = { ga4?: string; gtm?: string; clarity?: string; metaPixel?: string };

// Only IDs that look valid are used, so a typo in the admin can never inject arbitrary script
const valid = {
    ga4: /^G-[A-Z0-9]{4,20}$/,
    gtm: /^GTM-[A-Z0-9]{4,12}$/,
    clarity: /^[a-z0-9]{6,20}$/,
    metaPixel: /^\d{8,20}$/,
};

/** Tracking tags set in Admin › SEO › Webmaster Tools. Loads after the page is interactive. */
export default function Analytics({ ids }: { ids: Ids }) {
    const ga4 = ids.ga4 && valid.ga4.test(ids.ga4) ? ids.ga4 : "";
    const gtm = ids.gtm && valid.gtm.test(ids.gtm) ? ids.gtm : "";
    const clarity = ids.clarity && valid.clarity.test(ids.clarity) ? ids.clarity : "";
    const pixel = ids.metaPixel && valid.metaPixel.test(ids.metaPixel) ? ids.metaPixel : "";

    return (
        <>
            {ga4 && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
                    <Script id="ga4" strategy="afterInteractive">
                        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');`}
                    </Script>
                </>
            )}
            {gtm && (
                <Script id="gtm" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
                </Script>
            )}
            {clarity && (
                <Script id="clarity" strategy="afterInteractive">
                    {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}
                </Script>
            )}
            {pixel && (
                <Script id="meta-pixel" strategy="afterInteractive">
                    {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
                </Script>
            )}
        </>
    );
}
