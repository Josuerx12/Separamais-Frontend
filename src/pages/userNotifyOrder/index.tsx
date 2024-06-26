import { Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { useQuery, useQueryClient } from "react-query";
import { useOrders } from "../../hooks/useOrders";
import { SkeletonCard } from "../../components/skelletons/card/styles";
import NotifyOrderCard from "../../components/cards/newNotifyOrder";
import { useFilterOrders } from "../../hooks/useFilterOrders";

const UserNotifyOrderPage = () => {
  const query = useQueryClient();
  const { userOrders } = useOrders();
  const { data, isLoading } = useQuery("userOrders", userOrders);

  const { newOrders, recicledOrders, quarentineOrders, collectedOrders } =
    useFilterOrders(data);
  return (
    <section className="m-3" style={{ flex: "1" }}>
      <h3 className="text-center fw-bold fs-2">
        ID's de compras recebidas pelo almoxarifado aguardando coleta
      </h3>
      <div className="d-flex justify-content-end gap-2 mb-3">
        <Button
          variant="dark"
          onClick={() => query.resetQueries("userOrders")}
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
      </div>

      <div
        className="d-flex justify-content-between gap-3 bg-light p-3 rounded border"
        style={{ overflowY: "auto" }}
      >
        <div
          className="d-flex flex-column gap-3 border rounded mx-auto bg-white"
          style={{
            minWidth: "350px",
            flex: "1",
            height: "70dvh",
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
        >
          <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
            Aguardando coleta
          </h5>
          {isLoading ? (
            Array.from(Array(4)).map((_, i) => {
              return <SkeletonCard key={i} />;
            })
          ) : newOrders && newOrders.length > 0 ? (
            newOrders?.map((item) => (
              <NotifyOrderCard key={item.id} orderTracking={item} />
            ))
          ) : (
            <p className="text-center fw-bold text-secondary">
              Nenhuma requisição realizada!
            </p>
          )}
        </div>

        <div
          className="d-flex flex-column gap-3 border rounded mx-auto bg-white"
          style={{
            minWidth: "350px",
            flex: "1",
            height: "70dvh",
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
        >
          <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
            Em Quarentena
          </h5>
          {isLoading ? (
            Array.from(Array(4)).map((_, i) => {
              return <SkeletonCard key={i} />;
            })
          ) : quarentineOrders && quarentineOrders.length > 0 ? (
            quarentineOrders?.map((item) => (
              <NotifyOrderCard key={item.id} orderTracking={item} />
            ))
          ) : (
            <p className="text-center fw-bold text-secondary">
              Nenhuma solicitação em quarentena!
            </p>
          )}
        </div>

        <div
          className="d-flex flex-column gap-3 border rounded mx-auto bg-white"
          style={{
            minWidth: "350px",
            flex: "1",
            height: "70dvh",
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
        >
          <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
            Coletados
          </h5>
          {isLoading ? (
            Array.from(Array(4)).map((_, i) => {
              return <SkeletonCard key={i} />;
            })
          ) : collectedOrders && collectedOrders.length > 0 ? (
            collectedOrders?.map((item) => (
              <NotifyOrderCard key={item.id} orderTracking={item} />
            ))
          ) : (
            <p className="text-center fw-bold text-secondary">
              Nenhuma coleta realizada!
            </p>
          )}
        </div>
        <div
          className="d-flex flex-column gap-3 border rounded mx-auto bg-white"
          style={{
            minWidth: "350px",
            flex: "1",
            height: "70dvh",
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
        >
          <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
            Enviados para o estoque
          </h5>
          {isLoading ? (
            Array.from(Array(4)).map((_, i) => {
              return <SkeletonCard key={i} />;
            })
          ) : recicledOrders && recicledOrders.length > 0 ? (
            recicledOrders?.map((item) => (
              <NotifyOrderCard key={item.id} orderTracking={item} />
            ))
          ) : (
            <p className="text-center fw-bold text-secondary">
              Nenhuma requisição realizada!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserNotifyOrderPage;
