/^[[:space:]]*"body": / {
  # Convert character sequences to character constants
  gsub(/\\r/, "")
  gsub(/\\n/, "\n")
  # Remove trailing punctuation
  gsub(/\n*",$/, "")
  # Look for the build dependency tag
  i=split($0, a, /### Build Dependencies/)
  if ( i != 2 ) {
    print "no build dependencies"
    exit 0
  }
  # Grab the specific build dependencies
  $0=a[2]
  i=split($0,a,/\nBuild with: /)
  # Throw away everything up to the build dependency tag
  delete a[1]
  # Format the individual dependencies
  errLines = 0
  depLines = 0
  for (i in a) {
    n=split(a[i], d, /\s+/)
    switch (d[1]) {
      case /version/ :
        if (n != 3) {
          err[errLines++]="missing version parameter: " a[i]
        }
        break

      case /git-clone/ :
        if (n != 3) {
          err[errLines++]="missing git-clone parameter: " a[i]
        }
        break

      default:
        err[errLines++]="unrecognized build type: " d[1] " - " a[i]
        break

    }
    # If we don't have any errors, format this dependency line and add it
    #  to the list of dependency lines.
    if (errLines == 0) {
      sep=""
      line=""
      for (n in d) {
        line=line sep d[n]
        sep=" "
      }
      dep[depLines++]=line
    }
  }
  # Print either errors (to stderr) or the dependency lines (to stdout)
  if (errLines == 0) {
      for (n in dep) {
        print dep[n]
      }
  } else {
      for (n in err) {
        print err[n] > "/dev/stderr"
      }
      exit 1
  }
}
