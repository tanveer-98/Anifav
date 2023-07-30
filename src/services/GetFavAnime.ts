var query = `
query ( $id : Int) {
    
      Media(id : $id , type: ANIME) {
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
`;

export async function getFavAnime(id: number) {
  var variables = {
    id: id,
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

  return fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);
}

function handleResponse(response: any) {
  return response.json().then(function (json: any) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data: any) {
  return data;
}

function handleError(error: any) {
//   alert("Error, check console");
  console.error(error);
}
