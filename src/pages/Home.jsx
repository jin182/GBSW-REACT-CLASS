import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import Header from '../component/Header';
import DiaryList from '../component/DiaryList';
import { DiaryStateContext } from '../App';
import { getMonthRangeByDate } from '../util';

export default function Home() {
    const navigate = useNavigate();
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        if (data.length >= 1) {
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter((it) => {
                    const itemDate = new Date(it.date);
                    return itemDate.getMonth() === pivotDate.getMonth();
                })
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;

    return (
        <div>
            <Header
                title={headerTitle}
                leftChild={<Button text={'<'} onClick={onDecreaseMonth} />}
                rightChild={<Button text={'>'} onClick={onIncreaseMonth} />}
            />
            <DiaryList data={filteredData} />
        </div>
    );
}
