import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { useReducer, useRef, useEffect, useState, createContext } from 'react';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import New from './pages/New';

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'INIT': {
            return action.data;
        }
        case 'CREATE': {
            return [action.data, ...state];
        }
        case 'UPDATE': {
            return state.map((it) => (String(it.id) === String(action.data.id) ? { ...action.data } : it));
        }
        case 'DELETE': {
            return state.filter((it) => String(it.id) !== String(action.targetId));
        }
        default: {
            return state;
        }
    }
}

const mockData = [
    {
        id: 'mock1',
        date: new Date().getTime(),
        content: 'mock1',
        emotionId: 1,
    },
    {
        id: 'mock2',
        date: new Date().getTime(),
        content: 'mock2',
        emotionId: 2,
    },
    {
        id: 'mock3',
        date: new Date().getTime(),
        content: 'mock3',
        emotionId: 3,
    },
];

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const idRef = useRef(0);

    useEffect(() => {
        dispatch({
            type: 'INIT',
            data: mockData,
        });
        setIsDataLoaded(true);
    }, []);

    const onCreate = (date, content, emotionId) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: idRef.current,
                date: new Date(date).getTime(),
                content,
                emotionId,
            },
        });
        idRef.current += 1;
    };

    const onUpdate = (targetId, date, content, emotionId) => {
        dispatch({
            type: 'UPDATE',
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotionId,
            },
        });
    };

    const onDelete = (targetId) => {
        dispatch({
            type: 'DELETE',
            targetId,
        });
    };

    if (!isDataLoaded) {
        return <div>데이터를 불러오고 있습니다.</div>;
    } else {
        return (
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/new" element={<New />} />
                            <Route path="/diary/:id" element={<Diary />} />
                            <Route path="/edit/:id" element={<Edit />} />
                        </Routes>
                    </div>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
        );
    }
}

export default App;
