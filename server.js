
if (require.main === module) {

    require("./proto/server").boot().catch(function (err) {
        console.error(err.stack);
        process.exit(1);
    });
}
