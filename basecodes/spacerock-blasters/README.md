## Developing

With node 18 installed, from inside this directory, run `npm install` followed by `npm start`. We use parcel as a development tool and packager, so a hot-reloading server will spin up at `http://localhost:1234` to allow you to play the game while developing.

## Production Deployment

Run `npm install` followed by `npm run build`. A production distribution will be created in the `dist/` directory for upload to a location of your choice.

### Netlify

If you're using Netlify like we are to deploy production environments and preview environments, you can configure the "base directory" as `basecodes/spacerock-blasters/` and the included `netlify.toml` in this directory should get you up and running.