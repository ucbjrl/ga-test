/#/ {
  # Strip comments
  gsub(/#.*$/,"")
}
/git-clone/ {
  project=$2
  repo=$3
  tag=$4
  # Do a shallow fetch of all branches, checkout the desired ref/sha, and build and publish the jars.
  printf "git clone --no-single-branch --no-checkout --depth 5 %s %s && (cd %s && git checkout %s && sbt +publishLocal)\n",repo,project,project,tag
  # If the tag looks like a SHA, assume it is and generate a command to just echo it,
  #  otherwise, generate a string to fetch the sha from the remote.
  # In either case, write the output to fd 3.
  if ( tag ~ /^[[:xdigit:]]+$/ ) {
    printf "echo %s\n", tag > "/dev/fd/3"
  } else {
    printf "git ls-remote --tags --heads %s %s", repo, tag > "/dev/fd/3"
  }
}
