module.exports = {
  webpack(config) {
    const conf = config;

    conf.entry = {
      main: ['index.jsx', 'components/index.js'],
    };
    // 번들 파일형식 지정
    conf.output.filename = '[name].[hash:8].bundle.js';
    conf.output.chunkFilename = '[name].[hash:8].bundle.js';

    // node modules 라이브러리 번들 파일명 지정
    conf.optimization.runtimeChunk = { name: 'vendors/vendors' };
    conf.optimization.splitChunks = {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors/vendors',
          chunks: 'all',
        },
        ui: {
          test: /[\\/]src[\\/]components[\\/]/,
          name: 'components/components',
          chunks: 'all',
          enforce: true,
        },
        lib: {
          test: /[\\/]src[\\/]libs[\\/]/,
          name: 'libs/libs',
          chunks: 'all',
          enforce: true,
        },
        pages: {
          test: /[\\/]src[\\/]pages[\\/]/,
          name(module) {
            const folder = module.resource.match(
              /[\\/]src[\\/]pages[\\/](.+?)[\\/]/,
            )[1];
            return `pages/${folder}/${folder}`;
          },
          enforce: true,
        },
      },
    };

    //image 파일을 같은 페이지 폴더에 포함시킨다.
    conf.module.rules.forEach((rule) => {
      'oneOf' in rule &&
        (rule.oneOf = [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: 'url-loader',
            options: {
              limit: 100, //data:base64 인코딩 될 파일크기 100b
              name(resource) {
                try {
                  const folder = resource.match(
                    /[\\/]src[\\/]pages[\\/](.+?)[\\/]/,
                  )[1];

                  if (folder) {
                    return `pages/${folder}/images/[name].[hash:8].[ext]`;
                  }
                } catch (e) {}
                return 'images/[name].[hash:8].[ext]';
              },
            },
          },
          ...rule.oneOf,
        ]);
    });

    if (process.env.REACT_APP_IS_DEV === 'false') {
      // production 빌드시 로그 지우기
      conf.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }

    return conf;
  },
};
