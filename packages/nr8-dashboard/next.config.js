const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

//
module.exports = (phase) => {
  if (phase === 'phase-production-build') {
    Object.keys(process.env).forEach((key) => {
      if (key.match(/^NEXT_PUBLIC/)) {
        delete process.env[key]
      }
    })
  }

  return withBundleAnalyzer({
    experimental: {
      externalDir: true,
    },
    reactStrictMode: true
  })
}