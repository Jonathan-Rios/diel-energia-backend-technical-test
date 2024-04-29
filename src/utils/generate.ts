import { randomUUID } from 'crypto'

export function generateTasksForToday() {
  const seedData = []
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDayOfNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    0,
  )
  const formattedToday = today.toISOString().slice(0, 10)

  for (
    let i = firstDayOfMonth.getDate();
    i <= lastDayOfNextMonth.getDate();
    i++
  ) {
    const dueDate = new Date(today.getFullYear(), today.getMonth(), i)
    const formattedDueDate = dueDate.toISOString().slice(0, 10)

    seedData.push(
      `INSERT INTO tasks (id, title, description, due_at, duration_minutes, created_at, updated_at, deleted_at) VALUES (${randomUUID()}, 'Monthly Task ${i}', 'Description for Monthly Task ${i}', '${formattedDueDate}T03:00:00.000Z', 15, '${formattedToday}T03:00:00.000Z', '${formattedToday}', NULL);`,
    )
  }

  console.log(seedData.join('\n'))
}
