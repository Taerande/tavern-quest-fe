import ScheduleItem from "../schedule/ScheduleItem"
import Col from "../ui/Grid/Col"
import Container from "../ui/Grid/Container"
import Row from "../ui/Grid/Row"

import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../plugin/firebase";
import LoadingSpinner from "../ui/LoadingSpinner";
const ScheduleList = () => {
    const [queriedItem, setQuriedItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            let queriedItem = [];
            const q = query(collection(db, "schedules"), where("gameId", "==", "wow"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                queriedItem.push({
                    ...doc.data(),
                    id: doc.id
                });
            })
            setQuriedItem(queriedItem);
        }
        getData().then(() => {
            setIsLoading(false);
        });
    }, []);


    return (<Container>
        <Row>
        {isLoading && <LoadingSpinner color={'alert'} width={ '12' } size={'72'} />}
        {!isLoading &&queriedItem.map((v) => {
            return (<Col col="3"  key={v.id}>
                <ScheduleItem data={ v }/>
            </Col>)
        })}
        </Row>
    </Container>)

}

export default ScheduleList