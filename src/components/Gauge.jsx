import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'

function Gauge({
  titulo,
  valor = 0,
  min = 0,
  max = 100,
  cor = '#d45ac4',
  unidade = ''
}) {

  const numero = Number(
    String(valor)
      .replace(',', '.')
      .replace('<', '')
  ) || 0

  const percentual =
    ((numero - min) / (max - min)) * 100

  const percentualLimitado =
    Math.max(0, Math.min(100, percentual))

  return (
    <div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          fontWeight: '600',
          color: '#555',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem'
        }}
      >
        {titulo}
      </p>

      <div
        style={{
          position: 'relative',
          width: 265,
          height: 250
        }}
      >
        <RadialBarChart
          width={280}
          height={145}
          cx={140}
          cy={170}
          innerRadius={65}
          outerRadius={150}
          startAngle={180}
          endAngle={0}
          data={[
            {
              value: percentualLimitado
            }
          ]}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
          />

          <RadialBar
            dataKey="value"
            fill={cor}
            background={{ fill: '#e8e8e8' }}
          />
        </RadialBarChart>

        <div
          style={{
            position: 'absolute',
            bottom: 100,
            width: '100%',
            textAlign: 'center',
            fontSize: '1.3rem',
            fontWeight: '700',
            color: cor
          }}
        >
          {valor} {unidade}
        </div>

        <span
          style={{
            position: 'absolute',
            bottom: 80,
            left: 5,
            fontSize: '0.75rem',
            color: '#999'
          }}
        >
          {min}
        </span>

        <span
          style={{
            position: 'absolute',
            bottom: 80,
            right: 5,
            fontSize: '0.75rem',
            color: '#999'
          }}
        >
          {max}
        </span>

      </div>

    </div>
  )
}

export default Gauge