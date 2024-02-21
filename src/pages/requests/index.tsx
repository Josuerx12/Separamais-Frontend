import { Button } from "react-bootstrap";
import { FaFilter, FaPlus } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import NewRequest from "../../components/modals/requests/new";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRequests } from "../../hooks/useRequests";
import NewRequetCard, { RequestType } from "../../components/cards/newRequests";
import InSeparationReqCard from "../../components/cards/isSeparationReq";
import WaitingToCollectCard from "../../components/cards/waitingToCollect";
import CollectedReqCard from "../../components/cards/collectedReq";
import { SkeletonCard } from "../../components/skelletons/card/styles";
import { useFilter } from "../../hooks/useFilter";
import RequestFilters, {
  RequestFiltersProps,
} from "../../components/filters/requestFilters";

const RequestsPage = () => {
  const { fetch } = useRequests();
  const [filters, setFilters] = useState<RequestFiltersProps>({
    exitID: undefined,
    startPeriod: "",
    endPeriod: "",
  });

  const requests = useQuery<RequestType[]>(["userRequests"], fetch);

  const query = useQueryClient();

  const [isRequesting, setIsRequesting] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  function handleCloseRequesting() {
    setIsRequesting((prev) => !prev);
  }

  const filteredReqs = requests.data?.filter((req) => {
    return (
      (!filters.exitID ||
        req.exitID.toString().includes(filters.exitID.toString())) &&
      (!filters.startPeriod ||
        new Date(req.createdAt) >= new Date(filters.startPeriod)) &&
      (!filters.endPeriod ||
        new Date(req.createdAt) <= new Date(filters.endPeriod))
    );
  });

  const { newReq, inSeparationReq, collectedReq, waitingToCollectReq } =
    useFilter(filteredReqs);

  return (
    <>
      <RequestFilters
        show={isFiltering}
        handleClose={() => setIsFiltering((prev) => !prev)}
        filters={filters}
        setFilters={setFilters}
      />
      <NewRequest show={isRequesting} handleClose={handleCloseRequesting} />
      <section className="m-3" style={{ flex: "1" }}>
        <h3 className="text-center fw-bold fs-2">Solicitações</h3>
        <div className="d-flex justify-content-end gap-2 mb-3">
          <Button
            variant="dark"
            onClick={() => query.resetQueries("userRequests")}
            className="d-flex gap-2 align-items-center justify-content-center btn-refresh"
          >
            <LuRefreshCcw />
          </Button>
          <Button
            variant="primary"
            className="d-flex gap-2 align-items-center justify-content-center"
          >
            <FaFilter /> Filtrar
          </Button>
          <Button
            onClick={handleCloseRequesting}
            className="d-flex gap-2 align-items-center justify-content-center"
            variant="success"
          >
            <FaPlus /> Nova Solicitação
          </Button>
        </div>
        <div
          className="d-flex justify-content-between gap-3 bg-light p-3 rounded border"
          style={{ overflowY: "auto" }}
        >
          <div
            className=" d-flex flex-column gap-3 border rounded bg-white p-2"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold">Novas</h5>
            {requests.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : newReq && newReq.length > 0 ? (
              newReq.map((req) => <NewRequetCard key={req._id} request={req} />)
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma solicitação realizada!
              </p>
            )}
          </div>
          <div
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white p-2"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold">Em Separação</h5>

            {requests.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : inSeparationReq && inSeparationReq.length > 0 ? (
              inSeparationReq.map((r) => (
                <InSeparationReqCard key={r._id} request={r} />
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma solicitação realizada!
              </p>
            )}
          </div>
          <div
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white p-2"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold">Aguardando Coleta</h5>

            {requests.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : waitingToCollectReq && waitingToCollectReq.length > 0 ? (
              waitingToCollectReq.map((r) => (
                <WaitingToCollectCard key={r._id} request={r} />
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma solicitação realizada!
              </p>
            )}
          </div>
          <div
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white p-2"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold">Coletadas</h5>
            {requests.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : collectedReq && collectedReq.length > 0 ? (
              collectedReq.map((r) => (
                <CollectedReqCard request={r} key={r._id} />
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma solicitação realizada!
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export { RequestsPage };
