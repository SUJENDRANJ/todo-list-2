import TodoContainer from "./Components/TodoContainer";

const App = () => {
  return (
    <div className="text-center min-h-screen">
      <h1 className="text-4xl m-10 font-semibold">TO-DO LIST</h1>
      <div>
        <TodoContainer />
      </div>
    </div>
  );
};

export default App;
