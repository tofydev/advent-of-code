x = File.stream!("../../../inputs/1/input.txt")
  |> Stream.map(&String.split(&1, "   ", trim: true))
  |> Stream.run
  |> Enum.map(&Tuple.to_list(&1))

IO.puts(x)

# Enum.map(%{1 => 2, 3 => 4}, fn {k, v} -> k * v end)
