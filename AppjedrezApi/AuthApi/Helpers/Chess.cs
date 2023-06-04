using System.Diagnostics;
using System.Globalization;
using AuthApi.Models;

namespace AuthApi.Helpers;

public class Chess
{
    private string stockfishPath = "Engine/stockfish-windows-2022-x86-64-avx2.exe";

    public async Task<List<Movimiento>> AnalizarMovimientos(List<Movimiento> moves)
    {
        List<Movimiento> newMoves = new List<Movimiento>();
        string bestMove = "e2e4";
        decimal eval;
        string moveString = "moves";
        int i = 0;

        foreach (var move in moves)
        {
            newMoves.Add(move);
            newMoves[i].BestMove = bestMove;
            moveString += " " + move.MoveFrom + move.MoveTo;

            bestMove = await EncontrarBestMove(moveString);

            Console.WriteLine(bestMove);

            eval = await EvaluarPosicion(moveString);

            Console.WriteLine(eval);

            newMoves[i].Evaluacion = eval;

            i++;
        }

        return newMoves;
    }
    public async Task<string> EncontrarBestMove(string moveString)
    {
        using (var stockfishProcess = new Process())
        {
            stockfishProcess.StartInfo.FileName = stockfishPath;
            stockfishProcess.StartInfo.UseShellExecute = false;
            stockfishProcess.StartInfo.RedirectStandardInput = true;
            stockfishProcess.StartInfo.RedirectStandardOutput = true;

            stockfishProcess.Start();

            await SendCommandAsync(stockfishProcess.StandardInput, $"position startpos {moveString}");
            await SendCommandAsync(stockfishProcess.StandardInput, "go depth 10");

            if (!stockfishProcess.WaitForExit(200))
            {
                stockfishProcess.Kill();
            }

            string bestMove = GetBestMove(stockfishProcess.StandardOutput);

            return bestMove;
        }
    }

    public async Task<decimal> EvaluarPosicion(string moveString)
    {
        using (var stockfishProcess = new Process())
        {
            stockfishProcess.StartInfo.FileName = stockfishPath;
            stockfishProcess.StartInfo.UseShellExecute = false;
            stockfishProcess.StartInfo.RedirectStandardInput = true;
            stockfishProcess.StartInfo.RedirectStandardOutput = true;

            stockfishProcess.Start();

            await SendCommandAsync(stockfishProcess.StandardInput, $"position startpos {moveString}");
            await SendCommandAsync(stockfishProcess.StandardInput, "eval");

            if (!stockfishProcess.WaitForExit(200))
            {
                stockfishProcess.Kill();
            }

            decimal eval = GetEval(stockfishProcess.StandardOutput);

            return eval;
        }
    }

    private async Task SendCommandAsync(StreamWriter writer, string command)
    {
        await writer.WriteLineAsync(command);
        await writer.FlushAsync();
    }

    private string GetBestMove(StreamReader reader)
    {
        string output = reader.ReadToEnd();
        string[] lines = output.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);
        string lastLine = lines.LastOrDefault(line => line.StartsWith("bestmove"));

        if (!string.IsNullOrEmpty(lastLine))
        {
            // Extraer el movimiento que está entre bestmove y endmove"
            int startIndex = lastLine.IndexOf("bestmove") + "bestmove".Length;
            int endIndex = lastLine.IndexOf("ponder");
            if (startIndex >= 0 && endIndex >= 0)
            {
                string move = lastLine.Substring(startIndex, endIndex - startIndex).Trim();
                return move;
            }
        }

        return null; // Si no se encuentra movimiento válido
    }

    private decimal GetEval(StreamReader reader)
    {
        string output = reader.ReadToEnd();
        string[] lines = output.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);
        string lastLine = lines.LastOrDefault(line => line.StartsWith("Classical evaluation"));

        if (!string.IsNullOrEmpty(lastLine))
        {
            // Extraer el movimiento que está entre bestmove y endmove"
            int startIndex = lastLine.IndexOf("Classical evaluation") + "Classical evaluation".Length;
            int endIndex = lastLine.IndexOf("(white side)");
            if (startIndex >= 0 && endIndex >= 0)
            {
                string move = lastLine.Substring(startIndex, endIndex - startIndex).Trim();
                decimal result;
                Decimal.TryParse(move, NumberStyles.AllowDecimalPoint | NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture, out result);
                return result;
            }
        }

        return 0; // Si no se encuentra evaluacion

    }
}
