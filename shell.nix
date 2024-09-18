{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixos-24.05.tar.gz") {} }:

let
  nodejs = pkgs.nodejs_20;
in
pkgs.mkShell {
  buildInputs = [
    nodejs
  ];

  shellHook = ''
    npm install --no-fund
  '';
}
