import urlMetadata from "url-metadata";

export async function urlMetadataInfo(url){
    let urlData = [];

    await urlMetadata(url).then(
        function (metadata){
            urlData={
                "url":{
                    "link": metadata.url,
					"title": metadata.title,
                    "image": metadata.image,
					"description": metadata.description	
                }
            };
        },

        function (error) {
            console.log(`url-metadata error ${error}`);
            urlData = {
                "url": {
                    "link": url,
                    "title": url,
                    "image": "https://img.freepik.com/premium-vector/404-error-web-template-with-bored-cat_23-2147763346.jpg?w=2000",
                    "description": "ERROR: URL not found"						
                }
            };
        }
    );

    return urlData;
}