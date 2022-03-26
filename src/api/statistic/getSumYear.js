import * as convertId from "../../function/converIdUser";
import * as getOrder from "../../api/statistic/orderByTime";
export async function getSumYear(year) {
  var sum = 0;
  sum =
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-01-01T00:00:00",
      year + "-02-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-02-01T00:00:00",
      year + "-03-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-03-01T00:00:00",
      year + "-04-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-04-01T00:00:00",
      year + "-05-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-05-01T00:00:00",
      year + "-06-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-06-01T00:00:00",
      year + "-07-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-07-01T00:00:00",
      year + "-08-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-08-01T00:00:00",
      year + "-09-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-09-01T00:00:00",
      year + "-10-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-10-01T00:00:00",
      year + "-11-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-11-01T00:00:00",
      year + "-12-01T00:00:00"
    )) +
    (await getOrder.getIncomeTime(
      convertId.convertId(sessionStorage.getItem("IdUser")),
      year + "-12-01T00:00:00",
      year + "-12-01T23:59:59"
    ));
  return sum;
}
