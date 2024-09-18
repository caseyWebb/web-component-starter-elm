module InteropDefinitions exposing (Flags, FromElm(..), ToElm(..), interop)

import TsJson.Decode as TsDecode exposing (Decoder)
import TsJson.Encode as TsEncode exposing (Encoder, required)


interop :
    { toElm : Decoder ToElm
    , fromElm : Encoder FromElm
    , flags : Decoder Flags
    }
interop =
    { toElm = toElm
    , fromElm = fromElm
    , flags = flags
    }


type FromElm
    = Alert String


type ToElm
    = FlagsUpdated Flags


type alias Flags =
    { firstName : String
    , lastName : String
    }


fromElm : Encoder FromElm
fromElm =
    TsEncode.union
        (\vAlert value ->
            case value of
                Alert string ->
                    vAlert string
        )
        |> TsEncode.variantTagged "alert"
            (TsEncode.object [ required "message" identity TsEncode.string ])
        |> TsEncode.buildUnion


toElm : Decoder ToElm
toElm =
    TsDecode.discriminatedUnion "msg"
        [ ( "flagsUpdated"
          , TsDecode.map FlagsUpdated flags
          )
        ]


flags : Decoder Flags
flags =
    TsDecode.succeed Flags
        |> TsDecode.andMap (TsDecode.field "firstName" TsDecode.string)
        |> TsDecode.andMap (TsDecode.field "lastName" TsDecode.string)
