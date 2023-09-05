import useCat from '../hooks/UseCat'
import CategoryForm from '../components/CategoryForm';


// const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const { data, error, isLoading } = useCat();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  {
    // <div>
    //   {//Render your data here
    //   }
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    // </div>
  }

  return (
    <div className="w-full h-auto mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">data</h1>
    <CategoryForm/>
      
    </div>
  )
}
