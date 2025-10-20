import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt, faBriefcase, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Tabs.css';

function LeadCard({ lead, onAccept, onDecline, isAccepted = false }) {

    if (!lead) return null;

    const formatDate = (dateStr, accepted = false) => {
        const date = new Date(dateStr);

        if (accepted) {
            const options = { month: 'long', day: 'numeric', year: 'numeric' };

            const datePart = date
                .toLocaleDateString('en-US', options)
                .replace(',', '');

            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12 || 12;

            return `${datePart} @ ${hours}:${minutes} ${ampm}`;

        } else {
            const options = { month: 'long', day: 'numeric' };
            const datePart = date.toLocaleDateString('en-US', options);
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12 || 12;

            return `${datePart} @ ${hours}:${minutes} ${ampm}`;
        }
    };

    return (
        <Card className="shadow-sm mb-2 w-100 rounded-0">
            <ListGroup variant="flush">

                <ListGroup.Item className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUser} size="2x" className="me-2" />
                    <div>
                        <div>{isAccepted ? lead.fullName : lead.firstName}</div>
                        <small className="text-muted">
                            {formatDate(lead.dateCreated, isAccepted)}
                        </small>
                    </div>
                </ListGroup.Item>

                <ListGroup.Item>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-secondary" />
                    {lead.suburb} &nbsp;
                    <FontAwesomeIcon icon={faBriefcase} className="me-2 ms-2 text-secondary" />
                    {lead.category} &nbsp;
                    <span className="text-muted ms-2 me-2">Job ID: {lead.id}</span>
                    {isAccepted && (
                        <span className="text-muted ms-2">
                            ${lead.price.toFixed(2)} <span className="text-muted fw-normal">Lead Invitation</span>
                        </span>
                    )}
                </ListGroup.Item>

                {isAccepted && (
                    <ListGroup.Item>
                        <FontAwesomeIcon
                            icon={faPhone}
                            className="me-2 text-secondary"
                        />
                        <span className="text-orange fw-medium me-3">{lead.phoneNumber}</span>

                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="me-2 text-secondary"
                        />
                        <span className="text-orange fw-medium">{lead.email}</span>
                    </ListGroup.Item>
                )}

                <ListGroup.Item>
                    {lead.description}
                </ListGroup.Item>

                {!isAccepted && (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <div>
                            <Button
                                className="btn-orange me-2"
                                onClick={() => onAccept(lead.id)}
                            >
                                Accept
                            </Button>
                            <Button
                                className="btn-gray"  
                                onClick={() => onDecline(lead.id)}
                            >
                                Decline
                            </Button>
                            <span className="text-bold ms-2">
                                ${lead.price.toFixed(2)} <span className="text-muted fw-normal">Lead Invitation</span>
                            </span>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    );
}

export default LeadCard;