module Component exposing (main)

import Browser
import Html exposing (Html, div, p, text)
import InteropDefinitions exposing (Flags)
import InteropPorts
import Json.Decode


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


type alias Model =
    { flags : Flags
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { flags = flags }, Cmd.none )


type Msg
    = FromJS (Result Json.Decode.Error InteropDefinitions.ToElm)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FromJS result ->
            case result of
                Ok (InteropDefinitions.FlagsUpdated updatedFlags) ->
                    ( { model | flags = updatedFlags }, Cmd.none )

                Err _ ->
                    ( model, Cmd.none )


view : Model -> Html Msg
view model =
    div
        []
        [ p []
            [ text <| String.join "" [ "Hello, ", model.flags.firstName, " ", model.flags.lastName, "!" ]
            ]
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    InteropPorts.toElm |> Sub.map FromJS
