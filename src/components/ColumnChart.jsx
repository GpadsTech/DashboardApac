import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip
} from "recharts";

function ColumnChart({
    titulo,
    unidade,
    dados,
    campo,
    cor = "#1d93d8"
}) {

    const historico = dados.slice(0, -1);

    const ultimos4 = historico.map(item => ({
        data: item.horaColeta,
        valor: Number(
            String(item[campo])
                .replace(",", ".")
                .replace("<", "")
        ) || 0
    }));

    const ultimoValor = Number(
        String(dados[dados.length - 1][campo])
            .replace(",", ".")
            .replace("<", "")
    ) || 0;

    return (

        <div style={{ height: 250, padding: 10 }}>

            <p
                style={{
                    textAlign: "center",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#555"
                }}
            >
                {titulo}
            </p>

            <ResponsiveContainer
                width="100%"
                height={140}
            >

                <BarChart data={ultimos4}>

                    <XAxis dataKey="data" />

                    <Tooltip />

                    <Bar
                        dataKey="valor"
                        fill={cor}
                        radius={[4,4,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

            <div
                style={{
                    textAlign:"center",
                    marginTop:10
                }}
            >

                <div
                    style={{
                        fontWeight:700
                    }}
                >
                    ATUAL
                </div>

                <div
                    style={{
                        color:cor,
                        fontSize:22,
                        fontWeight:700
                    }}
                >
                    {ultimoValor} {unidade}
                </div>

            </div>

        </div>

    );

}

export default ColumnChart;