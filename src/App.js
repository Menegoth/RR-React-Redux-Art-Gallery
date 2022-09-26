import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { clearData, fetchData, incrementId, decrementId, inputId } from "./features/dataSlice";
import { useEffect } from 'react';

function App(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  function renderImage() {
    if (data.apiData) {
      return <img style={{"width": "100vw"}} src={data.apiData.primaryImage} alt={data.apiData.title}/>
    } else {
      return <p>Image here</p>
    }
  }

  useEffect(()=> {
    dispatch(fetchData());
  }, [props.objectId, dispatch]);

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(clearData())}>Clear</button>
        <button onClick={() => dispatch(decrementId())}>Back</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
      </div>
      <input onChange={(e) => dispatch(inputId(Number(e.target.value)))} />
      <div>
        {data.objectId}
        {renderImage()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  objectId: state.data.objectId
});

export default connect(mapStateToProps)(App);
