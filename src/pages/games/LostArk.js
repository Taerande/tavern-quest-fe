import ScheduleFilter from "../../components/games/lostark/ScheduleFilter";
import Col from "../../components/ui/Grid/Col";
import Container from "../../components/ui/Grid/Container";
import Row from "../../components/ui/Grid/Row";

const LostArk = () => {
    return <>
        <div>This is lost ark page</div>
        <ScheduleFilter />
        <Container>
            <Row>
                <Col col='3'>111</Col>
            </Row>
            <Row>
                <Col col='3'>111</Col>
                <Col col='6'>222</Col>
                <Col col='12'>333</Col>
            </Row>
            <Row>
                <Col>111</Col>
                <Col>222</Col>
                <Col>333</Col>
            </Row>
        </Container>
        
    </>

}

export default LostArk;