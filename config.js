module.exports = {
  "/hsl-vector-map": {
    "source": "mbtiles://./finland.mbtiles",
    "headers": {
      "Cache-Control": "public,max-age=86400"
    }
  },
  "/hsl-map": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style")
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/hsl-stop-map": {
    "source": `otpstops://${process.env.OTP_URL}:${process.env.OTP_PORT}/otp/routers/hsl/index/graphql`,
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/hsl-route-map": {
    "source": `otproutes://${process.env.OTP_URL}:${process.env.OTP_PORT}/otp/routers/hsl/index/graphql`,
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/finland-stop-map": {
    "source": `otpstops://${process.env.OTP_URL}:${process.env.OTP_PORT}/otp/routers/finland/index/graphql`,
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/hsl-parkandride-map": {
    "source": "hslparkandride://",
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  }
}
