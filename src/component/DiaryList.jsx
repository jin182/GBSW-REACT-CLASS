import { useState, useEffect } from 'react';
import './DiaryList.css';
import Button from '../component/Button';
import DiaryItem from './DiaryItem';
import { useNavigate } from 'react-router-dom';

const sortOptions = [
    { value: 'latest', name: '새로운 순' },
    { value: 'oldest', name: '오래된 순' },
];

export default function DiaryList({ data }) {
    const [sortType, setSortType] = useState('latest');
    const [sortedData, setSortedData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.length > 0) {
            const compare = (a, b) => {
                if (sortType === 'latest') {
                    return Number(b.date) - Number(a.date);
                } else {
                    return Number(a.date) - Number(b.date);
                }
            };
            const copyList = JSON.parse(JSON.stringify(data));
            copyList.sort(compare);
            setSortedData(copyList);
        } else {
            setSortedData([]);
        }
    }, [data, sortType]);
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const onClickNew = () => {
        navigate('/New');
    };

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptions.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="right_col">
                    <Button type="positive" text="새 일기 쓰기" onClick={onClickNew} />
                </div>
            </div>
            <div className="list_wrapper">
                {sortedData.map((it) => (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
}
