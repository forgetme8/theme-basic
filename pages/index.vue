<script setup>
const { locale } = useI18n()
const merchantInfo = await stateMerchant.info(true)
const themeId = merchantInfo.website ? merchantInfo.website.theme : '1'

const seoInit = (infoObj) => {
  const info = isRef(infoObj) ? infoObj.value : infoObj
  if (isNotEmptyObj(info)) {
    const url = useRequestURL().href
    const title = nameI18n(locale, info)
    let description = descI18n(locale, info).replace(/[\r\n]/g, ' ')
    //const logo = info.logo || 'https://docs.idatariver.com/logo.png'

    let itemListElement = []
    info.projects.forEach(project => {
      description += '|' + nameI18n(locale, project)

      if (!project.skus) { return }
      project.skus.forEach(sku => {
        itemListElement.push({
          "@type": "ListItem",
          "position": itemListElement.length + 1,
          "item": {
            "@id": `${url}#${sku.id}`,
            "name": nameI18n(locale, sku)
          }
        })
      })
    })

    useHead({
      title: title,
      meta: [
        { 'name': 'description', 'content': description },
        { 'itemprop': 'name', 'content': title },
        { 'itemprop': 'description', 'content': description },
        { 'itemprop': 'url', 'content': url },
        //{ 'itemprop': 'image', 'content': logo },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
          })
        }
      ],
    })

    useSeoMeta({
      ogType: 'website',
      ogSiteName: title,
      ogTitle: title,
      ogUrl: url,
      //ogImage: logo,
      ogDescription: description,
    })
  }
}

seoInit(merchantInfo)
</script>


<template>
  <NuxtLayout name="simplified" :merchant="merchantInfo">
   
      <section class="flex justify-center w-full pt-[30vh] items-center container">
        <div class="flex flex-col items-center justify-center gap-2">
          <motion.h1 class=" text-center text-4xl font-bold" :initial="{ y: -50, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }" :transition="{ duration: 0.5, ease: 'easeInOut' }">
            {{ merchantInfo.name }}
          </motion.h1>

          <motion.h3 class=" text-center text-sm text-gray-500" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
            :transition="{ duration: 0.5, ease: 'easeInOut', delay: 0.5 }">
            {{ merchantInfo.desc }}
          </motion.h3>


        </div>
      </section>
    
  </NuxtLayout>
</template>