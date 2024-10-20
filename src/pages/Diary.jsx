import { useParams, useNavigate } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import Header from '../component/Header';
import Button from '../component/Button';
import Viewer from '../component/Viewer';
import { getFormattedDate } from '../util';

export default function Diary() {
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    if (!data) return <div>일기를 불러오고 있습니다.</div>;

    const { date, emotionId, content } = data;
    const title = `${getFormattedDate(new Date(date))} 일기`;

    return (
        <div>
            <Header
                title={title}
                leftChild={<Button text="뒤로가기" onClick={goBack} />}
                rightChild={<Button text="수정하기" onClick={goEdit} />}
            />

            <Viewer content={content} emotionId={emotionId} />
        </div>
    );
}
