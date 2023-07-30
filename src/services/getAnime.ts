var query = `
query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(search: $search, type: ANIME, sort: TRENDING) {
        id
        title {
          english
        }
        type
        genres
        coverImage {
            extraLarge
            large
            medium
            color
          }
        description
        duration  
        popularity
        countryOfOrigin
        
      }
    }
  }
`;

export async  function   getAnime (page : number , perPage : number) {
    var variables = {
        page: page,
        perPage: perPage,
      };
      
      var url = "https://graphql.anilist.co",
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: query,
            variables: variables,
          }),
        };

 return fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
}

function handleResponse(response : any) {
  return response.json().then(function (json : any ) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data : any) {
return data;
}

function handleError(error :any ) {
//   alert("Error, check console");
  console.error(error);
}
