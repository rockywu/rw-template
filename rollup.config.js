import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
export default [
    // {
    //     input: "./rw.js",
    //     output: {
    //         format: "umd",
    //         file: "dist/rwvm.js",
    //         name: "rwvm",
    //         sourcemap: true
    //     },
    // },
    {
        input: "./src/index.js",
        output: {
            format: "umd",
            file: "dist/vm.js",
            name: "vm",
            sourcemap: true
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            livereload({
            watch: 'dist'
            }),
            serve({
                open: true,
                openPage: "examples/index.html",
                port: 6002,
                contentBase: ""
            })
        ]
    }
]
