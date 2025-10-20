import LeadCard from './LeadCard';

function LeadsList({ leads = [], onAccept = () => { }, onDecline = () => { }, isAccepted = false}) {
  if (!leads.length) return <div>Nenhuma lead encontrada.</div>;

  return (
    <div className="d-flex flex-column align-items-center">
      {leads.map(lead => (
        <div key={lead.id} className="w-100" style={{ maxWidth: '900px', marginBottom: '1rem' }}>
          <LeadCard
            lead={lead}
            onAccept={onAccept}
            onDecline={onDecline}
            isAccepted={isAccepted}
          />
        </div>
      ))}
    </div>
  );
}

export default LeadsList;
