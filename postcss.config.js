/**
 * Created by xiaojianli on 2017/3/24.
 */
module.exports = {
    plugins: [
        require('autoprefixer')({browsers:['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']})
    ]
}