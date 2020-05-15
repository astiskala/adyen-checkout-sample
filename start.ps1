function Set-PsEnv {
    [CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'Low')]
    param()

    if($Global:PreviousDir -eq (Get-Location).Path){
        Write-Verbose "Set-PsEnv:Skipping same dir"
    } else {
        $Global:PreviousDir = (Get-Location).Path
    }

    #return if no env file
    if (!( Test-Path $localEnvFile)) {
        Write-Verbose "No .env file"
        return
    }

    #read the local env file
    $content = Get-Content $localEnvFile -ErrorAction Stop
    Write-Verbose "Parsed .env file"

    #load the content to environment
    foreach ($line in $content) {

        if([string]::IsNullOrWhiteSpace($line)){
            Write-Verbose "Skipping empty line"
            continue
        }

        #ignore comments
        if($line.StartsWith("#")){
            Write-Verbose "Skipping comment: $line"
            continue
        }

        #get the operator
        if($line -like "*:=*"){
            Write-Verbose "Prefix"
            $kvp = $line -split ":=",2
            $cmd = '$Env:{0} = "{1};$Env:{0}"' -f $kvp[0].Trim(),$kvp[1].Trim()
        }
        elseif ($line -like "*=:*"){
            Write-Verbose "Suffix"
            $kvp = $line -split "=:",2
            $cmd = '$Env:{0} += ";{1}"' -f $kvp[0].Trim(),$kvp[1].Trim()
        }
        else {
            Write-Verbose "Assign"
            $kvp = $line -split "=",2
            $cmd = '$Env:{0} = "{1}"' -f $kvp[0].Trim(),$kvp[1].Trim()
        }

        Write-Verbose $cmd
        
        if ($PSCmdlet.ShouldProcess("$($cmd)", "Execute")) {
            Invoke-Expression $cmd
        }
    }
}

$localEnvFile='.env'
Set-PsEnv

php -S localhost:3000 -t src/ server/php/index.php