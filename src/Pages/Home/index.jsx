import { useContext, useEffect } from 'react';
import { Layout } from '../../Components/Layout';
import { MasivosContext } from '../../Context';
import { SendExcel } from '../../Components/SendExcel';
import { Template } from '../../Components/Template';
import SendExample from '../../Components/SendExample';
import { ImgTemplate } from '../../Components/ImgTemplate';
import { MySend } from '../../Components/MySend';

function Home() {
  const context = useContext(MasivosContext);

  useEffect(() => {

    context.handleGetTemplate(context.tokenUser, context.homeDataClient?.id)
    .then((response) => {
      const templates = response.templates?.map((item) => {
        return item
      })
      context.setGetTemplates(templates || [])
    })
  }, [])

  return (
    <Layout title={context.homeDataClient.attributes.Client}>
        <div className="flex justify-center mx-auto"> 
          <div className="flex-grow w-4/5"> 
            <div className="bg-white rounded-[10px] shadow border p-5" >
              
                <Template />
                <SendExample />
              
            </div>
            <div className="bg-white rounded-[10px] shadow border p-5 mt-5">
              
                <SendExcel />
              
            </div>
          </div>
          <div className="ml-6">  

          <ImgTemplate configStyle={false} />
 
          </div>
        </div>
    <MySend />
    </Layout>
    
  );
}

export { Home };


