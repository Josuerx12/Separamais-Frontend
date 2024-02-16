type RequestedBy = {
  id: string;
  name: string;
  login: string;
  phone: string;
  email: string;
};

type SeparetedBy = {
  id?: string;
  name?: string;
  login?: string;
  phone?: string;
  email?: string;
};

type DispatchedBy = {
  id?: string;
  name?: string;
  login?: string;
  phone?: string;
  email?: string;
};

type CollectedBy = {
  name?: string;
  document?: string;
};

export interface RequestType {
  _id: string;
  requestedBy: RequestedBy;
  status: string;
  exitID: number;
  desc: string;
  separetedBy: SeparetedBy;
  separetedAt: string;
  dispatchedBy: DispatchedBy;
  collectedBy: CollectedBy;
  collectedAt: string;
  createdAt: string;
  updatedAt: string;
}

const NewRequetCard = ({ request }: { request: RequestType }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center p-2 m-2 rounded border newRequestCard bg-light"
      style={{ flex: "1", position: "relative" }}
    >
      <h6>
        ID de Saída: <b>{request.exitID}</b>
      </h6>
      <p>
        <b>Desc</b>: {request.desc}
      </p>
      <span>
        Solicitado: {new Date(request.createdAt).toLocaleString("pt-BR")}
      </span>
    </div>
  );
};

export default NewRequetCard;