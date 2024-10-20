import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate, emotionList } from '../util';
import Button from './Button';
import EmotionItem from './EmotionItem';
import './Editor.css';

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: '',
    });

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);

    const handleOnChange = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    const handleOnChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    const handleOnChangeEmotion = useCallback(
        (emotionId) => {
            setState({
                ...state,
                emotionId,
            });
        },
        [state]
    );

    const handleSubmit = () => {
        onSubmit(state);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleOnChange} />
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem
                            key={it.id}
                            id={it.id}
                            img={it.img}
                            name={it.name}
                            onClick={handleOnChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea value={state.content} onChange={handleOnChangeContent} />
                </div>
            </div>
            <div className="editor_section bottom_section">
                <Button text={'취소하기'} onClick={handleGoBack} />
                <Button text={'작성완료'} type={'positive'} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Editor;
