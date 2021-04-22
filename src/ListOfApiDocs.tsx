import React, {useEffect, useState} from 'react';
interface ApiDocWrapper {
  _links: {
    self: string;
    webui: string;
  };
  id: string;
}
export default function ListOfApiDocs(this: any) {
  const [apiDocsList, setApiDocsList] = useState<Array<ApiDocWrapper> >([{
    id: "1234",
    _links: {
      webui: "a web link",
      self: "https://zenuml-stg.atlassian.net"
    }
  }]);

  useEffect(() => {
    console.log('use effect');
    // @ts-ignore
    AP.request({

      url: "/rest/api/content/",
      data: {
        "type": 'ac:my-api:async-api-doc',
        "spaceKey": "ZS",
        "expand": "children"
      },
      success: function (response: any) {
        let customers = JSON.parse(response).results;
        console.log(customers);
        setApiDocsList(customers);
      },
      error: function (err: any) {
        console.log("err - ", err)
      }
    })
  }, []);
  const docs = apiDocsList.map((doc) => {
    const selfUrl = new URL(doc._links.self);
    return (<div key={doc.id}>{doc.id} webui: {selfUrl.protocol}//{selfUrl.host}/wiki{doc._links.webui}</div>)
  });
  return (
    <>
      <div>List of API Docs:</div>
      {docs}
    </>
  );
}