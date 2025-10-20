import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import LeadsList from './LeadsList';
import './Tabs.css';

function Tabs() {
    const [activeTab, setActiveTab] = useState("Invited");
    const [leads, setLeads] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/leads`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) setLeads(data);
                else setLeads([]);
            })
            .catch(err => console.error('Erro ao buscar leads:', err));
    }, []);

    const filteredLeads = Array.isArray(leads) ? leads.filter(lead => lead.status === activeTab) : [];

    const handleClick = (tab) => {
        setActiveTab(tab);
    };

    const handleAccept = async (id) => {
        try {
            const leadToUpdate = leads.find(l => l.id === id);
            if (!leadToUpdate) return;

            const updatedLead = { ...leadToUpdate, status: "Accepted" };

            const response = await fetch(`/api/leads/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedLead),
            });

            if (!response.ok) throw new Error("Erro ao aceitar lead");

            //const data = await response.json();

            setLeads(prevLeads =>
                prevLeads.map(l =>
                    l.id === id ? { ...l, status: "Accepted" } : l
                )
            );
            
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecline = async (id) => {
        try {
            const leadToUpdate = leads.find(l => l.id === id);
            if (!leadToUpdate) return;

            const updatedLead = { ...leadToUpdate, status: "Declined" };

            const response = await fetch(`/api/leads/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedLead),
            });

            if (!response.ok) throw new Error("Erro ao recusar lead");

            const data = await response.json();

            setLeads(leads.map(l => l.id === id ? data : l));
        } catch (error) {
            console.error(error);
        }
    };

    const containerStyle = { maxWidth: '900px', margin: '0 auto' };

    return (
        <>
            <Container style={containerStyle} className='bg-light shadow-sm'>
                <Row>
                    <Col
                        className={`text-center tab-item border-end ${activeTab === "Invited" ? "active" : ""}`}
                        onClick={() => handleClick("Invited")}
                    >
                        Invited
                    </Col>
                    <Col
                        className={`text-center tab-item ${activeTab === "Accepted" ? "active" : ""}`}
                        onClick={() => handleClick("Accepted")}
                    >
                        Accepted
                    </Col>
                </Row>
            </Container>

            <Container style={containerStyle} className='mt-2 p-0' >
                <Row className='mt-2'>
                    <LeadsList leads={filteredLeads}
                        onAccept={handleAccept}
                        onDecline={handleDecline}
                        isAccepted={activeTab === "Accepted"}
                    />
                </Row>
            </Container>
        </>
    );
}

export default Tabs;
