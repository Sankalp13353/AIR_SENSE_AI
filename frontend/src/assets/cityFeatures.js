const base = {

    month: 8,
    day_name: "monday",
    is_weekend: false,
    season: "monsoon",
    time_of_day: "afternoon",

    humidity_percent: 72,
    dew_point_c: 22,

    wind_gusts_kmh: 12,

    precipitation_mm: 0,

    is_raining: false,

    heavy_rain: false,

    pressure_msl_hpa: 1010,

    cloud_cover_percent: 65,

    festival_period: false,

    crop_burning_season: false,

    hour: 12,

    day: 15,

    year: 2024
};

export const profiles = {

    clean:{

        ...base,

        pm2_5_ugm3:18,
        pm10_ugm3:30,

        co_ugm3:220,
        no2_ugm3:8,
        so2_ugm3:4,
        o3_ugm3:18,
        dust_ugm3:10,

        aod:.18,

        aqi_lag_1:28,
        aqi_lag_3:29,
        aqi_lag_6:30,
        aqi_lag_12:31,
        aqi_lag_24:29,

        aqi_roll_mean_24:29,
        aqi_roll_max_24:33,
        aqi_roll_min_24:25,
        aqi_roll_std_24:2
    },

    moderate:{

        ...base,

        pm2_5_ugm3:45,
        pm10_ugm3:70,

        co_ugm3:450,
        no2_ugm3:18,
        so2_ugm3:7,
        o3_ugm3:24,
        dust_ugm3:22,

        aod:.42,

        aqi_lag_1:72,
        aqi_lag_3:70,
        aqi_lag_6:68,
        aqi_lag_12:69,
        aqi_lag_24:70,

        aqi_roll_mean_24:70,
        aqi_roll_max_24:76,
        aqi_roll_min_24:64,
        aqi_roll_std_24:3
    },

    polluted:{

        ...base,

        humidity_percent:60,

        pm2_5_ugm3:190,
        pm10_ugm3:330,

        co_ugm3:1500,
        no2_ugm3:70,
        so2_ugm3:20,
        o3_ugm3:18,
        dust_ugm3:120,

        aod:1.6,

        festival_period:true,
        crop_burning_season:true,

        aqi_lag_1:310,
        aqi_lag_3:315,
        aqi_lag_6:320,
        aqi_lag_12:305,
        aqi_lag_24:300,

        aqi_roll_mean_24:310,
        aqi_roll_max_24:325,
        aqi_roll_min_24:295,
        aqi_roll_std_24:10
    }

};